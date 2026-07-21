const fs = require('fs');
const path = require('path');

const UID = process.env.FORTYTWO_APP_ID;
const SECRET = process.env.FORTYTWO_APP_SECRET;
const LOGIN = 'aboulahd';

const PROJECT_DETAILS = {
    'minishell': { desc: 'Custom Unix shell — parsing, pipes, redirections', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/Minishell' },
    'Philosophers': { desc: 'Dining philosophers — multithreading & mutex sync', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/Philosophers' },
    'fract-ol': { desc: 'Real-time fractal renderer with zoom', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/42-Fract-ol' },
    'push_swap': { desc: 'Sorting algorithm — minimum operations', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/42-Push_Swap' },
    'pipex': { desc: 'Unix pipe mechanism reproduction', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/42-Pipex' },
    'get_next_line': { desc: 'Reading a line from a file descriptor', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/42-get_next_line' },
    'ft_printf': { desc: 'Custom printf implementation', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/42-ft_printf' },
    'Libft': { desc: 'Custom C standard library', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/42-libft' },
    'cub3d': { desc: 'RayCaster with miniLibX', lang: 'C', badge: 'C-A8B9CC', logo: 'c', link: 'https://github.com/Bouly/cub3d' },
    'NetPractice': { desc: 'Networking concepts and configuration', lang: 'Network', badge: 'Network-000000', logo: 'cisco', link: 'https://github.com/Bouly/NetPractice' },
    'CPP Module 00': { desc: 'C++ - Namespaces, classes, member functions', lang: 'C++', badge: 'C++-00599C', logo: 'cplusplus', link: 'https://github.com/Bouly/CPP00' },
    'CPP Module 01': { desc: 'C++ - Memory allocation, pointers, references', lang: 'C++', badge: 'C++-00599C', logo: 'cplusplus', link: 'https://github.com/Bouly/CPP01' },
    'CPP Module 02': { desc: 'C++ - Ad-hoc polymorphism, operator overloading', lang: 'C++', badge: 'C++-00599C', logo: 'cplusplus', link: 'https://github.com/Bouly/CPP02' },
    'CPP Module 03': { desc: 'C++ - Inheritance', lang: 'C++', badge: 'C++-00599C', logo: 'cplusplus', link: 'https://github.com/Bouly/CPP03' },
    'CPP Module 04': { desc: 'C++ - Subtype polymorphism, abstract classes, interfaces', lang: 'C++', badge: 'C++-00599C', logo: 'cplusplus', link: 'https://github.com/Bouly/CPP04' }
};

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
    
    if (!response.ok) throw new Error(`Failed to fetch token: ${response.statusText}`);
    return (await response.json()).access_token;
}

async function getUserData(token) {
    console.log(`Fetching data for user ${LOGIN}...`);
    const response = await fetch(`https://api.intra.42.fr/v2/users/${LOGIN}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(`Failed to fetch user data: ${response.statusText}`);
    return await response.json();
}

function generateStatsMarkdown(userData) {
    const cursus = userData.cursus_users.find(c => c.cursus_id === 21) || userData.cursus_users[0];
    let levelStr = cursus ? `Level ${cursus.level.toFixed(2)}` : 'Unknown Level';
    let poolMonth = userData.pool_month || '';
    let poolYear = userData.pool_year || '';
    let grade = cursus && cursus.grade ? cursus.grade : 'Student';
    
    return `
<div align="center">

![42 Level](https://img.shields.io/badge/42--Cursus-${encodeURIComponent(levelStr)}-00babc?style=for-the-badge&logo=42&logoColor=white)
![42 Grade](https://img.shields.io/badge/Grade-${encodeURIComponent(grade)}-00babc?style=for-the-badge&logo=42&logoColor=white)
![Pool](https://img.shields.io/badge/Pool-${poolMonth}_${poolYear}-00babc?style=for-the-badge&logo=42&logoColor=white)

</div>
`;
}

function generateProjectsMarkdown(userData) {
    // Filter validated projects, exclude exams and piscines
    const projects = userData.projects_users.filter(p => 
        p['validated?'] === true && 
        !p.project.name.toLowerCase().includes('exam') &&
        !p.project.name.toLowerCase().includes('piscine') &&
        p.project.name !== 'Born2beroot' // often omitted or you can keep it
    );

    // Sort by created_at or marked_at to show newest first or chronological
    projects.sort((a, b) => new Date(a.marked_at) - new Date(b.marked_at));

    let md = `| Project | Description | Mark | Language |\n|:--------|:------------|:----:|:--------:|\n`;
    
    projects.forEach(p => {
        const name = p.project.name;
        const details = PROJECT_DETAILS[name] || {
            desc: '42 Cursus Project',
            lang: 'C',
            badge: 'C-A8B9CC',
            logo: 'c',
            link: `https://github.com/Bouly`
        };

        const linkStr = `[**${name}**](${details.link})`;
        const markStr = `**${p.final_mark}**`;
        const langStr = `![${details.lang}](https://img.shields.io/badge/-${details.badge}?style=flat-square&logo=${details.logo}&logoColor=black)`;
        
        md += `| ${linkStr} | ${details.desc} | ${markStr} | ${langStr} |\n`;
    });

    return md;
}

function generateTimelineMarkdown(userData) {
    const projects = userData.projects_users.filter(p => 
        p['validated?'] === true && 
        !p.project.name.toLowerCase().includes('exam') &&
        !p.project.name.toLowerCase().includes('piscine') &&
        p.project.name !== 'Born2beroot'
    );
    projects.sort((a, b) => new Date(a.marked_at) - new Date(b.marked_at));

    let html = '<table align="center">\n';
    
    for (let i = 0; i < projects.length; i += 4) {
        html += '<tr>\n';
        for (let j = 0; j < 4; j++) {
            const index = i + j;
            if (index < projects.length) {
                const p = projects[index];
                const name = p.project.name;
                const link = (PROJECT_DETAILS[name] && PROJECT_DETAILS[name].link) ? PROJECT_DETAILS[name].link : 'https://github.com/Bouly';
                // replace spaces in name for badge shield
                const badgeName = name.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_');
                
                html += `<td align="center"><a href="${link}"><img src="https://img.shields.io/badge/${badgeName}-%E2%9C%85-success?style=flat-square&logo=42&logoColor=white" alt="${name}"/></a></td>\n`;
                
                if (j < 3 && index < projects.length - 1) {
                    html += `<td align="center">➜</td>\n`;
                } else if (j < 3) {
                    html += `<td align="center">➜</td>\n<td align="center"><img src="https://img.shields.io/badge/Next...-%F0%9F%94%84-blue?style=flat-square&logo=42&logoColor=white" alt="Next"/></td>\n`;
                    // fill the rest of the row with empty tds to keep alignment
                    for (let k = j + 1; k < 3; k++) {
                        html += `<td></td>\n<td></td>\n`;
                    }
                    break;
                }
            }
        }
        html += '</tr>\n';
    }
    html += '</table>\n';
    return html;
}

function replaceInReadme(readmeContent, startTag, endTag, newContent) {

    const startIndex = readmeContent.indexOf(startTag);
    const endIndex = readmeContent.indexOf(endTag);
    if (startIndex === -1 || endIndex === -1) return readmeContent;
    
    const before = readmeContent.substring(0, startIndex + startTag.length);
    const after = readmeContent.substring(endIndex);
    return `${before}\n${newContent}\n${after}`;
}

async function updateReadme() {
    try {
        if (!UID || !SECRET) {
            console.log("No 42 API credentials provided. Skipping update.");
            return;
        }

        const token = await getAccessToken();
        const userData = await getUserData(token);
        
        const statsMarkdown = generateStatsMarkdown(userData);
        const projectsMarkdown = generateProjectsMarkdown(userData);
        const timelineMarkdown = generateTimelineMarkdown(userData);

        const readmePath = path.join(__dirname, '..', 'README.md');
        let readmeContent = fs.readFileSync(readmePath, 'utf8');

        readmeContent = replaceInReadme(readmeContent, '<!-- 42_STATS_START -->', '<!-- 42_STATS_END -->', statsMarkdown);
        readmeContent = replaceInReadme(readmeContent, '<!-- 42_PROJECTS_START -->', '<!-- 42_PROJECTS_END -->', projectsMarkdown);
        readmeContent = replaceInReadme(readmeContent, '<!-- 42_TIMELINE_START -->', '<!-- 42_TIMELINE_END -->', timelineMarkdown);
        
        fs.writeFileSync(readmePath, readmeContent, 'utf8');
        console.log('README.md successfully updated!');

    } catch (error) {
        console.error("Error updating README:", error);
        process.exit(1);
    }
}

updateReadme();
