module.exports = {
    base: '/',
    title: 'KubeMQ Documentation',
    description: 'Message broker  for containers and Kubernetes',
    head: ['link', { rel: 'icon', href: '/icon.png' }],
    ga: 'UA-128055473-1',
    plugins: ['@vuepress/active-header-links', {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
        headerTopOffset: 120
    }],
    markdown: {
        anchor: { permalink: false },
        lineNumbers: true,
    },
    themeConfig: {
        editLinks: false,
        displayAllHeaders: false,
        logo: `/kubemq-logo.png`,
        docsDir: 'docs',
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'KubeMQ.io', link: 'https://kubemq.io' },
            { text: 'Register', link: 'https://account.kubemq.io/login/register'},
        ],
        sidebar: [{
                title: 'Home',
                collapsable: true,
                children: [
                    '/home',
                ]
            },
            {
                title: 'Installation',
                collapsable: true,
                children: [
                    '/get-started',
                    `/installation-kubetools`,
                ]
            },
            {
                title: 'Concepts',
                collapsable: true,
                children: [

                    `/concepts-queue`,
                    `/concepts-pubsub`,
                    `/concepts-rpc`,
                    '/concepts-terminology',
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
                    `/configuration-queue`,
                    `/configuration-interfaces`,
                    `/configuration-logging`,
                    `/configuration-metrics`,

                ]
            },
             {
                title: 'Reference',
                collapsable: true,
                children: [
                    '/sdk-net',
                    '/sdk-java',
                    '/sdk-go',
                    '/sdk-python',
                    '/rest',
                    '/examples'
                ]
            },
        ]
    }
};
