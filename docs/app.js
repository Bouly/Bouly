document.addEventListener('DOMContentLoaded', async () => {
    let userData = { level: '--', grade: '--', projects: {} };

    try {
        const response = await fetch('data.json');
        if (response.ok) {
            userData = await response.json();
        }
    } catch (e) {
        console.log("Could not load data.json, using defaults.");
    }

    document.getElementById('level').innerText = `Level: ${userData.level || '--'}`;
    document.getElementById('grade').innerText = `Grade: ${userData.grade || '--'}`;

    const nodesArray = graphNodes.map(node => {
        const projectData = userData.projects[node.id];
        let color = '#30363d'; // locked (default)
        let border = '#161b22';
        let fontColor = '#8b949e';
        let title = `${node.id}<br>Status: Not started`;

        if (projectData) {
            if (projectData.status === 'finished' && projectData.validated) {
                color = '#00babc'; // validated
                border = '#00babc';
                fontColor = '#ffffff';
                title = `${node.id}<br>Mark: <b>${projectData.mark}</b><br>Status: Validated`;
            } else {
                color = '#8b949e'; // available or in progress
                border = '#6e7681';
                fontColor = '#ffffff';
                title = `${node.id}<br>Status: In Progress`;
            }
        }

        return {
            id: node.id,
            label: node.label,
            level: node.level,
            title: title, // tooltip
            color: {
                background: color,
                border: border,
                highlight: {
                    background: color,
                    border: '#ffffff'
                }
            },
            font: { color: fontColor, face: 'Inter' },
            shape: 'dot',
            size: 20,
            borderWidth: 2
        };
    });

    // Make next available projects grey if their dependencies are met
    // (A simplified check: if a project is not started, we check its incoming edges)
    nodesArray.forEach(node => {
        if (!userData.projects[node.id]) {
            // Check if any incoming edge comes from a validated project
            const incoming = graphEdges.filter(e => e.to === node.id);
            const isAvailable = incoming.some(e => {
                const parent = userData.projects[e.from];
                return parent && parent.status === 'finished' && parent.validated;
            });
            if (isAvailable || node.id === 'Libft') { // Libft is always available
                node.color.background = '#8b949e'; // grey
                node.color.border = '#6e7681';
                node.font.color = '#ffffff';
                node.title = `${node.id}<br>Status: Available`;
            }
        }
    });

    const nodes = new vis.DataSet(nodesArray);
    const edges = new vis.DataSet(
        graphEdges.map(edge => ({
            from: edge.from,
            to: edge.to,
            color: { color: '#30363d', highlight: '#00babc' },
            arrows: 'to'
        }))
    );

    const container = document.getElementById('mynetwork');
    const data = { nodes, edges };
    const options = {
        layout: {
            hierarchical: {
                direction: 'LR',
                sortMethod: 'directed',
                levelSeparation: 150,
                nodeSpacing: 100
            }
        },
        physics: {
            hierarchicalRepulsion: {
                nodeDistance: 150
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 100
        }
    };

    new vis.Network(container, data, options);
});
