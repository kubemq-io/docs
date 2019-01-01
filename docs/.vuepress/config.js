module.exports = {
    base: '/',
    title: 'KubeMQ Documentation',
    description: 'Message broker  for containers and Kubernetes',
    head:
        ['link' , {rel :  'icon' , href :  '/icon.png' }],
    plugins: ['@vuepress/active-header-links', {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
        headerTopOffset: 120
    }],
    markdown: {

        lineNumbers: true,
    },
    themeConfig: {
        editLinks: false,
        displayAllHeaders: true,
        logo: `/kubemq-logo.png`,
        docsDir: 'docs',
        sidebar: [
            {
                title: 'Installation',
                collapsable: true,
                children: [
                    '/installation-get',
                    `/installation-single`,
                    `/installation-cluster`
                ]
            },
            {
                title: 'Concepts',
                collapsable: true,
                children: [
                    '/concepts-terminology',
                    `/concepts-messaging-patterns`,
                    `/concepts-endpoints`,
                ]
            },
            {
                title: 'Configuration',
                collapsable: true,
                children: [
                    '/configuration-general',
                    `/configuration-cluster`,
                    `/configuration-persistence`,
                    `/configuration-grpc`,
                    `/configuration-rest`,
                    `/configuration-logging`,
                    `/configuration-metrics`,

                ]
            },
            {
                title: 'API',
                collapsable: true,
                children: [
                    '/rest',
                ]
            },

        ]
    }
};