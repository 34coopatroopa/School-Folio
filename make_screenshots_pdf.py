"""
Part 3 helper: screenshots every screen of the Expedia clone and builds one PDF.

Setup (once):  pip install playwright pillow  &&  playwright install chromium
Run with the app already running (npm start on :3000, json-server on :8080):
    python make_screenshots_pdf.py
Output: Part3_EPT_Screenshots.pdf  (+ individual PNGs in ./screenshots)
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont

BASE = "http://localhost:3000"
MAX_H = 2600  # cap very long pages (the Stays list is ~50,000px tall)
SCREENS = [  # (route, title) - edit order/titles as you like
    ("/", "Home Page"), ("/stay", "Stays - Hotel Search Results"),
    ("/flight", "Flights - Search and Results"), ("/ThingsToDo", "Things To Do"),
    ("/checkout", "Checkout - Review and Book"), ("/login", "Sign In"),
    ("/register", "Register"), ("/admin", "Admin Dashboard"),
    ("/admin/hotels", "Admin - All Hotels"), ("/admin/products", "Admin - All Flights"),
    ("/admin/adminflight", "Admin - Add Flight"), ("/admin/adminstay", "Admin - Add Hotel"),
]

out = Path("screenshots"); out.mkdir(exist_ok=True)
pages = []
try:
    font = ImageFont.truetype("arial.ttf", 34)
except OSError:
    font = ImageFont.load_default()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    for i, (route, title) in enumerate(SCREENS, 1):
        page.goto(BASE + route, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1500)
        h = min(page.evaluate("document.documentElement.scrollHeight"), MAX_H)
        png = out / f"{i:02d}_{title.split(' ')[0].lower()}.png"
        page.screenshot(path=str(png), clip={"x": 0, "y": 0, "width": 1440, "height": h}, full_page=True)
        shot = Image.open(png).convert("RGB")
        sheet = Image.new("RGB", (shot.width + 80, shot.height + 150), "white")
        d = ImageDraw.Draw(sheet)
        d.text((40, 40), f"Screen {i}: {title}", fill=(31, 111, 92), font=font)
        d.text((40, 95), f"Route: {route}", fill=(110, 110, 110), font=font)
        sheet.paste(shot, (40, 140))
        d.rectangle([39, 139, 40 + shot.width, 140 + shot.height], outline=(200, 200, 200), width=2)
        pages.append(sheet)
        print("captured", title)
    browser.close()

pages[0].save("Part3_EPT_Screenshots.pdf", save_all=True, append_images=pages[1:], resolution=150)
print("Wrote Part3_EPT_Screenshots.pdf")
