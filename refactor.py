import os
import re
import shutil

src_dir = r"c:\Programming\TEDx\tedxPVGCOETMFrontend\src"
sections_dir = os.path.join(src_dir, "sections")

groups = {
    "Events/AvantGarde": ["AvantGardeHeroSection", "AvantGardeTalkSection", "AvantGardeTeamSection"],
    "Events/Punarutthan": [
        "PunarutthanHeroSection", "PunaratthanTeamLogisticsandOperationSection", 
        "PunarutthanTalksSection", "PunarutthanTeamCurationSection", 
        "PunarutthanTeamDesignandProductionSection", "PunarutthanTeamEditorialSection", 
        "PunarutthanTeamFinanceandSponsorshipSection", "PunarutthanTeamMediaandCommunicationSection", 
        "PunarutthanTeamSection"
    ],
    "Events/TakeTheLeap": ["TakeTheLeapHeroSection", "TakeTheLeapTalkSection", "TakeTheLeapTeamSection"],
    "Events/Drishti": ["DrishtiSection", "DrishtiVideo", "DrishthiHero"],
    "Events/PastEvents": ["PastEventSection", "PastEventSection1", "PastEventSection2"],
    "Events/Common": ["EventHeroSection"],
    "Team": [
        "TeamHeroSection", "LogisticsCard", "EditorialCard", "FinanceCard", 
        "DesignCard", "CurationCard", "MediaCard", "TechnicalCard", "OrganizersCard",
        "Core", "Curation", "Lno", "Editorial", "Mnm", "Dnp", "Technical", "Finance"
    ],
    "Forms": ["SpeakerFormSection", "SponsorFormSection", "SponsorFeedback", "SubscribeSection", "SpeakerCard", "Speaker"],
    "Common": ["FooterSection", "HeroSection", "AboutTED", "AboutTEDx", "SectionHeader", "WhatWeStandFor", "GallerySection", "PerspectiveSection", "BackgroundSection"]
}

# 1. Map basenames to new directories
base_to_newdir = {}
for group_path, basenames in groups.items():
    for b in basenames:
        base_to_newdir[b] = os.path.join(sections_dir, os.path.normpath(group_path))

# 2. Gather all files and plan their moves
moves = {} # old_abs_path -> new_abs_path
for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.jsx', '.js', '.css')):
            old_path = os.path.join(root, f)
            basename, ext = os.path.splitext(f)
            
            # If it's in root sections_dir, we might move it
            if root == sections_dir and basename in base_to_newdir:
                new_dir = base_to_newdir[basename]
                new_path = os.path.join(new_dir, f)
                moves[old_path] = new_path
            else:
                moves[old_path] = old_path # No move

# 3. Create directories and move files
for old_path, new_path in moves.items():
    if old_path != new_path:
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        shutil.move(old_path, new_path)

def resolve_import(source_old_path, import_str):
    if import_str.startswith('./') or import_str.startswith('../'):
        source_dir = os.path.dirname(source_old_path)
        raw_target = os.path.normpath(os.path.join(source_dir, import_str))
        
        target_old_path = None
        if os.path.exists(raw_target) and not os.path.isdir(raw_target):
            target_old_path = raw_target
        else:
            # Let's try extensions in moves
            for ext in ['.jsx', '.js', '.css', '']:
                test_path = raw_target + ext
                for k in moves.keys():
                    if os.path.normcase(k) == os.path.normcase(test_path):
                        target_old_path = k
                        break
                if target_old_path: break

        # Files outside the immediate moves like assets
        if not target_old_path:
            for ext in ['', '.jsx', '.js', '.ts', '.tsx', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.mp4']:
                tp = raw_target + ext
                if os.path.exists(tp):
                    target_old_path = tp
                    break

        if not target_old_path:
            return import_str # Give up
        
        target_new_path = moves.get(target_old_path, target_old_path)
        source_new_path = moves.get(source_old_path, source_old_path)
        
        rel = os.path.relpath(target_new_path, os.path.dirname(source_new_path))
        rel = rel.replace('\\', '/')
        if not rel.startswith('.'):
            rel = './' + rel
        
        if '.' not in os.path.basename(import_str) and not import_str.endswith('/'):
            rel = os.path.splitext(rel)[0]
            
        return rel
    return import_str

# 4. Read the NEW locations, update imports
for old_path, new_path in moves.items():
    if not (new_path.endswith('.jsx') or new_path.endswith('.js') or new_path.endswith('.css')):
        continue
    with open(new_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # CSS updates
    if new_path.endswith('.css'):
        def css_replacer(m):
            pre = m.group(1)
            p = m.group(2)
            post = m.group(3)
            new_p = resolve_import(old_path, p)
            return f"{pre}{new_p}{post}"
        content = re.sub(r'(url\([\'"]?)([^)\'"]+)([\'"]?\))', css_replacer, content)
    else:
        # JSX / JS updates
        def js_replacer(m):
            full = m.group(0)
            quote = m.group(2)
            p = m.group(3)
            new_p = resolve_import(old_path, p)
            return full.replace(f"{quote}{p}{quote}", f"{quote}{new_p}{quote}")
        
        content = re.sub(r'((?:import|from|require\s*\()\s*)([\'"])(.+?)\2', js_replacer, content)
    
    with open(new_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done reorganizing!")
