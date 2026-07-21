const fs = require('fs');
const path = require('path');

const UID = process.env.FORTYTWO_APP_ID;
const SECRET = process.env.FORTYTWO_APP_SECRET;
const LOGIN = 'Bouly';

async function getAccessToken() {
    console.log('Fetching access token...');
    const response = await fetch('https://api.intra.42.fr/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: UID,
            client_secret: SECRET
        })
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.access_token;
}

async function getUserData(token) {
    console.log(`Fetching data for user ${LOGIN}...`);
    const response = await fetch(`https://api.intra.42.fr/v2/users/${LOGIN}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }
    
    return await response.json();
}

function generateMarkdown(userData) {
    // Find the main cursus (42cursus usually has id 21)
    const cursus = userData.cursus_users.find(c => c.cursus_id === 21) || userData.cursus_users[0];
    
    let levelStr = cursus ? `Level ${cursus.level.toFixed(2)}` : 'Unknown Level';
    let poolMonth = userData.pool_month || '';
    let poolYear = userData.pool_year || '';
    let grade = cursus && cursus.grade ? cursus.grade : 'Student';
    
    // Generate the markdown string
    return `
<div align="center">

![42 Level](https://img.shields.io/badge/42--Cursus-${encodeURIComponent(levelStr)}-00babc?style=for-the-badge&logo=42&logoColor=white)
![42 Grade](https://img.shields.io/badge/Grade-${encodeURIComponent(grade)}-00babc?style=for-the-badge&logo=42&logoColor=white)
![Pool](https://img.shields.io/badge/Pool-${poolMonth}_${poolYear}-00babc?style=for-the-badge&logo=42&logoColor=white)

</div>
`;
}

async function updateReadme() {
    try {
        if (!UID || !SECRET) {
            console.log("No 42 API credentials provided. Skipping update.");
            return;
        }

        const token = await getAccessToken();
        const userData = await getUserData(token);
        const statsMarkdown = generateMarkdown(userData);

        const readmePath = path.join(__dirname, '..', 'README.md');
        let readmeContent = fs.readFileSync(readmePath, 'utf8');

        const startTag = '<!-- 42_STATS_START -->';
        const endTag = '<!-- 42_STATS_END -->';

        const startIndex = readmeContent.indexOf(startTag);
        const endIndex = readmeContent.indexOf(endTag);

        if (startIndex === -1 || endIndex === -1) {
            console.error("Could not find tags in README.md");
            return;
        }

        const before = readmeContent.substring(0, startIndex + startTag.length);
        const after = readmeContent.substring(endIndex);

        const newReadme = `${before}\n${statsMarkdown}\n${after}`;
        
        fs.writeFileSync(readmePath, newReadme, 'utf8');
        console.log('README.md successfully updated!');

    } catch (error) {
        console.error("Error updating README:", error);
        process.exit(1);
    }
}

updateReadme();
