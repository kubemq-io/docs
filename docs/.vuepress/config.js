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
        config: md => {
            md.set({
                breaks: true,
                html: true,
                linkify: true,
                typographer: true,
            });
            md.use(require('markdown-it'))
        },
        lineNumbers: true,
    },
    themeConfig: {
        editLinks: false,
        displayAllHeaders: true,
        logo: `/kubemq-logo.png`,
        docsDir: 'docs',
        sidebar: [
            `/home`,
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
                    `/configuration-interfaces`,
                    `/configuration-logging`,
                    `/configuration-metrics`,

                ]
            },
            {
                title: 'Reference',
                collapsable: true,
                children: [
                    '/rest',
                ]
            },

        ]
    }
};