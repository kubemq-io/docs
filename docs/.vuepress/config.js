module.exports = {
    base: '/',
    title: 'KubeMQ Documentation',
    description: 'Message broker  for containers and Kubernetes',
    head: ['link', { rel: 'icon', href: '/icon.png' }],
//    ga: 'UA-128055473-1',
    plugins:[
        ['@vuepress/active-header-links',
            {
                sidebarLinkSelector: '.sidebar-link',
                headerAnchorSelector: '.header-anchor',
                headerTopOffset: 120
            }
        ],
        ['@vuepress/last-updated'],
        [`@dovyp/vuepress-plugin-clipboard-copy`],
        [ 'code-switcher' ],
        ['vuepress-plugin-element-tabs'],
        ['@vuepress/back-to-top'],
        ['@vuepress/google-analytics',
             {
                 'ga': 'UA-128055473-1' // UA-00000000-0
             }
         ],
        ['@vuepress/medium-zoom'],
        ['@vuepress/nprogress'],
        ['seo'],
        ['sitemap',
            {
            hostname: 'https://docs.kubemq.io'
            }
            ],
    ],

    markdown: {
        anchor: { permalink: false },
        lineNumbers: true,
        plugins: ['footnote'],
    },
    themeConfig: {
        editLinks: false,
        displayAllHeaders: false,
        logo: `/kubemq-logo.png`,
        docsDir: 'docs',
        lastUpdated: 'Last Updated',
        domain: 'https://docs.kubemq.io',
        nav: [
            { text: 'KubeMQ.io', link: 'https://kubemq.io' },
            { text: 'Register', link: 'https://account.kubemq.io/login/register'},
        ],
        sidebar: [{
                title: 'Home',
                collapsable: false,
                children: [
                    '/introduction',
                ]
            },
            {
                title: 'Get Started',
                collapsable: false,
                children: [
                    '/get_started/get_started',
                    '/get_started/queue',
                    '/get_started/pubsub',
                    '/get_started/rpc',
                ]
            },
            {
                title: 'Installation',
                collapsable: false,
                children: [
                    '/installation/kubernetes',
                    '/installation/docker',
                ]
            },
            {
                title: 'Configuration',
                collapsable: false,
                children: [
                    // '/configuration/kubetools',
                    '/configuration/manual',
                ]
            },
            {
                title: 'Message Patterns',
                collapsable: false,
                children: [
                    '/tutorials/concepts',
                    `/tutorials/queue`,
                    `/tutorials/pubsub`,
                    `/tutorials/rpc`,
                    // `/tutorials/kubetools`,
                 ]
            },
             {
                title: 'Reference',
                collapsable: false,
                children: [
                    '/reference/net',
                    '/reference/java',
                    '/reference/go',
                    '/reference/python',
                    '/reference/rest',
                    '/reference/examples'
                ]
            },
        ]
    }
};
