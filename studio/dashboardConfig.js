export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5dbe3c91dd80e259c81013de',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-aptvox94',
                  apiId: 'fc6dd9e6-dd87-437c-8034-67e92fc7c2ff'
                },
                {
                  buildHookId: '5dbe3c910625a5fb22621d37',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-vdrhitz8',
                  apiId: 'b159f67f-8b4d-4e1f-b56d-ec357cb4944f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/DuckyDisciple/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-vdrhitz8.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
