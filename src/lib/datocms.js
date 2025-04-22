import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.datocms.com/';
const token = import.meta.env.DATOCMS_API_TOKEN;

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export async function getBasic(lang) {
  const query = `query MyQuery {
    basic(locale: ${lang}) {
      name
      email
      label
      phone
      summary
      city
      country
    }
  }`;

  const data = await client.request(query);
  return data.basic;
}

export async function getProfiles() {
  const query = `query MyQuery {
    allProfiles(orderBy: position_DESC) {
      network
      username
      icon
      url
    }
  }`;

  const data = await client.request(query);
  return data.allProfiles;
}

export async function getExperiences(lang) {
  const query = `query MyQuery {
    allExperiences(orderBy: position_ASC, locale: ${lang}) {
      name
      country
      jobPosition
      summary
      url
      highlights
      startDate
      endDate
    }
  }`;

  const data = await client.request(query);
  return data.allExperiences;
}

export async function getEducations(lang) {
  const query = `query MyQuery {
    allEducations(locale: ${lang}, orderBy: position_ASC) {
      institution
      area
      startDate
      endDate
      url
    }
  }`;

  const data = await client.request(query);
  return data.allEducations;
}

export async function getProjects(lang) {
  const query = `query MyQuery {
    allProjects(orderBy: position_ASC, locale: ${lang}) {
      name
      description
      isActive
      highlights
      url
    }
  }`;

  const data = await client.request(query);
  return data.allProjects;
}

export async function getSkills(lang) {
  const query = `query MyQuery {
    allSkills(locale: ${lang}, orderBy: position_ASC) {
      name
      icon
      keyword
      level
    }
  }`;

  const data = await client.request(query);
  return data.allSkills;
}
