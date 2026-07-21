// Static representation of the 42 Common Core graph
const graphNodes = [
    { id: 'Libft', label: 'Libft', level: 0 },
    { id: 'ft_printf', label: 'ft_printf', level: 1 },
    { id: 'get_next_line', label: 'get_next_line', level: 1 },
    { id: 'Born2beroot', label: 'Born2beroot', level: 1 },
    { id: 'pipex', label: 'pipex', level: 2 },
    { id: 'so_long', label: 'so_long', level: 2 },
    { id: 'FdF', label: 'FdF', level: 2 },
    { id: 'fract-ol', label: 'fract-ol', level: 2 },
    { id: 'push_swap', label: 'push_swap', level: 2 },
    { id: 'minitalk', label: 'minitalk', level: 2 },
    { id: 'Philosophers', label: 'Philosophers', level: 3 },
    { id: 'minishell', label: 'minishell', level: 3 },
    { id: 'cub3d', label: 'cub3d', level: 4 },
    { id: 'miniRT', label: 'miniRT', level: 4 },
    { id: 'NetPractice', label: 'NetPractice', level: 4 },
    { id: 'CPP Module 00', label: 'CPP 00', level: 4 },
    { id: 'CPP Module 01', label: 'CPP 01', level: 4 },
    { id: 'CPP Module 02', label: 'CPP 02', level: 4 },
    { id: 'CPP Module 03', label: 'CPP 03', level: 4 },
    { id: 'CPP Module 04', label: 'CPP 04', level: 4 },
    { id: 'CPP Module 05', label: 'CPP 05', level: 5 },
    { id: 'CPP Module 06', label: 'CPP 06', level: 5 },
    { id: 'CPP Module 07', label: 'CPP 07', level: 5 },
    { id: 'CPP Module 08', label: 'CPP 08', level: 5 },
    { id: 'CPP Module 09', label: 'CPP 09', level: 5 },
    { id: 'Inception', label: 'Inception', level: 5 },
    { id: 'webserv', label: 'webserv', level: 5 },
    { id: 'ft_irc', label: 'ft_irc', level: 5 },
    { id: 'ft_transcendence', label: 'ft_transcendence', level: 6 }
];

const graphEdges = [
    { from: 'Libft', to: 'ft_printf' },
    { from: 'Libft', to: 'get_next_line' },
    { from: 'Libft', to: 'Born2beroot' },
    
    { from: 'ft_printf', to: 'pipex' },
    { from: 'ft_printf', to: 'minitalk' },
    
    { from: 'get_next_line', to: 'so_long' },
    { from: 'get_next_line', to: 'FdF' },
    { from: 'get_next_line', to: 'fract-ol' },
    { from: 'get_next_line', to: 'push_swap' },
    
    // minitalk or pipex -> philosophers
    { from: 'pipex', to: 'Philosophers' },
    { from: 'minitalk', to: 'Philosophers' },
    
    // push_swap -> minishell
    { from: 'push_swap', to: 'minishell' },
    
    // minishell -> cub3d / miniRT / NetPractice / CPP
    { from: 'minishell', to: 'cub3d' },
    { from: 'minishell', to: 'miniRT' },
    { from: 'minishell', to: 'NetPractice' },
    { from: 'minishell', to: 'CPP Module 00' },
    
    // CPP chain
    { from: 'CPP Module 00', to: 'CPP Module 01' },
    { from: 'CPP Module 01', to: 'CPP Module 02' },
    { from: 'CPP Module 02', to: 'CPP Module 03' },
    { from: 'CPP Module 03', to: 'CPP Module 04' },
    { from: 'CPP Module 04', to: 'CPP Module 05' },
    { from: 'CPP Module 05', to: 'CPP Module 06' },
    { from: 'CPP Module 06', to: 'CPP Module 07' },
    { from: 'CPP Module 07', to: 'CPP Module 08' },
    { from: 'CPP Module 08', to: 'CPP Module 09' },
    
    // NetPractice -> Inception
    { from: 'NetPractice', to: 'Inception' },
    { from: 'cub3d', to: 'Inception' },
    
    // CPP 04 -> webserv / ft_irc
    { from: 'CPP Module 04', to: 'webserv' },
    { from: 'CPP Module 04', to: 'ft_irc' },
    
    // Inception & webserv -> transcendence
    { from: 'Inception', to: 'ft_transcendence' },
    { from: 'webserv', to: 'ft_transcendence' },
    { from: 'CPP Module 09', to: 'ft_transcendence' }
];
