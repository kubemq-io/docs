module.exports = {
    base: '/',
    title: 'KubeMQ Documentation',
    description: 'Message broker for containers and Kubernetes',
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
                title: 'Introduction',
                collapsable: false,
                children: [
                    '/introduction/introduction',
                    '/introduction/quick-start',
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
                title: 'Operations',
                collapsable: false,
                children: [
                    '/operations/create',
//                    '/operations/apply',
                    '/operations/status',
                    '/operations/context',
                    '/operations/delete',
                    '/operations/describe',
                   '/operations/events',
                    '/operations/logs',
                    '/operations/proxy',
                    '/operations/scale',

                ]
            },
            {
                title: 'Configuration',
                collapsable: false,
                children: [
                    {
                        title: 'Recipes',
                        collapsable: true,
                        children: [
                             '/configuration/recipes/config-security',

                        ]
                    },
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
                 ]
            },
            {
                title: 'Kubemqctl',
                collapsable: false,
                children: [
                    '/kubemqctl/kubemqctl',
                    {
                        title: 'Cluster',
                        collapsable: true,
                        children: [
                            '/kubemqctl/cluster/kubemqctl_cluster_create',
                            '/kubemqctl/cluster/kubemqctl_cluster_apply',
                            '/kubemqctl/cluster/kubemqctl_cluster_delete',
                            '/kubemqctl/cluster/kubemqctl_cluster_scale',
                            '/kubemqctl/cluster/kubemqctl_cluster_get',
                            '/kubemqctl/cluster/kubemqctl_cluster_describe',
                            '/kubemqctl/cluster/kubemqctl_cluster_logs',
                            '/kubemqctl/cluster/kubemqctl_cluster_proxy',
                            '/kubemqctl/cluster/kubemqctl_cluster_events',
                            '/kubemqctl/cluster/kubemqctl_cluster_context',
                            '/kubemqctl/cluster/kubemqctl_cluster_dashboard',
                        ]
                    },
                    {
                        title: 'Queues',
                        collapsable: true,
                        children: [
                            '/kubemqctl/queues/kubemqctl_queues_send',
                            '/kubemqctl/queues/kubemqctl_queues_receive',
                            '/kubemqctl/queues/kubemqctl_queues_stream',
                            '/kubemqctl/queues/kubemqctl_queues_peek',
                            '/kubemqctl/queues/kubemqctl_queues_ack',
                            '/kubemqctl/queues/kubemqctl_queues_list',
                            '/kubemqctl/queues/kubemqctl_queues_attach',
                        ]
                    },
                    {
                        title: 'Events',
                        collapsable: true,
                        children: [
                            '/kubemqctl/events/kubemqctl_events_send',
                            '/kubemqctl/events/kubemqctl_events_receive',
                            '/kubemqctl/events/kubemqctl_events_attach',
                        ]
                    },
                    {
                        title: 'Events Store',
                        collapsable: true,
                        children: [
                            '/kubemqctl/events_store/kubemqctl_events_store_send',
                            '/kubemqctl/events_store/kubemqctl_events_store_receive',
                            '/kubemqctl/events_store/kubemqctl_events_store_attach',
                            '/kubemqctl/events_store/kubemqctl_events_store_list',
                        ]
                    },
                    {
                        title: 'Commands',
                        collapsable: true,
                        children: [
                            '/kubemqctl/commands/kubemqctl_commands_send',
                            '/kubemqctl/commands/kubemqctl_commands_receive',
                            '/kubemqctl/commands/kubemqctl_commands_attach',
                        ]
                    },
                    {
                        title: 'Queries',
                        collapsable: true,
                        children: [
                            '/kubemqctl/queries/kubemqctl_queries_send',
                            '/kubemqctl/queries/kubemqctl_queries_receive',
                            '/kubemqctl/queries/kubemqctl_queries_attach',
                        ]
                    },
                    {
                        title: 'Config',
                        collapsable: true,
                        children: [
                            '/kubemqctl/config/kubemqctl_config',
                        ]
                    },
                ]
            },
            {
                title: 'Development',
                collapsable: false,
                children: [
                    '/development/net',
                    '/development/java',
                    '/development/go',
                    '/development/python',
                    '/development/rest',
                    '/development/examples'
                ]
            },
        ]
    }
};
