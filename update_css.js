const fs = require('fs');
const path = require('path');

const cssDir = path.join('c:\\Users\\rahul\\OneDrive - ADvTECH Ltd\\Just Dogs Groomig_ST10515950\\Css');
const files = ['SSheet1.css', 'SSheet2.css', 'SSheet3.css', 'SSheet4.css'];

const globalTypo = `/* Global Reset & Typography */
body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    color: #333;
    line-height: 1.6;
}
h1, h2, h3, h4 {
    font-family: 'Poppins', 'Montserrat', sans-serif;
    color: #2c3e50;
}
p {
    color: #4a5568;
}

`;

const newNav = `nav ul{
    list-style: none;
    padding: 8px 16px;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-radius: 50px;
    width: max-content;
    overflow: hidden;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
nav a{
    color: #4a5568;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    text-align: center;
    border-radius: 50px;
    transition: all 0.3s ease;
}
nav a:hover{
    background-color: #245c53;
    color: #ffffff;
}`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    
    // Replace old nav
    const oldNavRegex = /nav\s*ul\s*\{[\s\S]*?nav\s*a:hover\s*\{[\s\S]*?\}/;
    if (oldNavRegex.test(content)) {
        content = content.replace(oldNavRegex, newNav);
    } else {
        content = newNav + '\n\n' + content;
    }
    
    // Replace old text-card shadow
    content = content.replace(/box-shadow:\s*0\s*20px\s*60px\s*rgba\(0,\s*0,\s*0,\s*0\.5\);/g, 
        'box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n    border: 1px solid rgba(0,0,0,0.05);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;');

    // Add hover effect for text-cards if not present
    if (!content.includes('[class^="text-card"]:hover')) {
        content += `\n[class^="text-card"]:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);\n}\n`;
    }
    
    // Insert global typography at top if not present
    if (!content.includes('Global Reset & Typography')) {
        content = globalTypo + content;
    }
    
    fs.writeFileSync(path.join(cssDir, file), content);
    console.log(`Updated ${file}`);
});
