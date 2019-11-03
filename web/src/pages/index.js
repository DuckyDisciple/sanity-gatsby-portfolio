import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import styled from "styled-components";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanityProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const Hero = styled.section`
  width: 100%;
  min-height: 30rem;
  padding: 3rem;
  position: relative;
`;

const HeroTitle = styled.h1`
  text-transform: uppercase;
  color: white;
  opacity: 0.99;
`;

const HeroText = styled.p`
  color: white;
  width: 50%;
  opacity: 0.99;
`;

const Projects = styled.section`
  width: 100%;
  min-height: 30rem;
  padding: 3rem;
  position: relative;
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <Hero>
          <HeroTitle>Good {getTimeOfDay()}!</HeroTitle>
          <HeroText>
            I'm Drew! I've been writing code for the past 15 years. While the content and quality
            have changed, my passion has never died down. My newest ventures have led me into web
            development, with a focus on using some of the latest technologies to make sites fast,
            responsive, and pleasing to use.
          </HeroText>
          <HeroText>
            If you're curious what type of work I've done, check out the projects below. These are
            just some samples to show variety in the different types of apps and sites I have made.
            If you have a project in mind, feel free to reach out and we can talk about options for
            your development needs!
          </HeroText>
        </Hero>
        <Projects>
          {projectNodes && (
            <ProjectPreviewGrid title="My Work" nodes={projectNodes} browseMoreHref="/archive/" />
          )}
        </Projects>
      </Container>
    </Layout>
  );
};

export default IndexPage;
