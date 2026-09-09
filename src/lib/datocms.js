import { GraphQLClient } from 'graphql-request';
import cvEn from '../data/cv-en.json';
import cvEs from '../data/cv-es.json';

const endpoint = 'https://graphql.datocms.com/';
const token = import.meta.env.DATOCMS_API_TOKEN;

const client = token
  ? new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  : null;

function getLocalData(lang = 'en') {
  return lang === 'es' ? cvEs : cvEn;
}

export async function getBasic(lang = 'en') {
  if (!client) return getLocalData(lang).basics;
  try {
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
    return data.basic || getLocalData(lang).basics;
  } catch (e) {
    return getLocalData(lang).basics;
  }
}

export async function getProfiles() {
  if (!client) return cvEn.profiles;
  try {
    const query = `query MyQuery {
      allProfiles(orderBy: position_DESC) {
        network
        username
        icon
        url
      }
    }`;
    const data = await client.request(query);
    return data.allProfiles || cvEn.profiles;
  } catch (e) {
    return cvEn.profiles;
  }
}

export async function getExperiences(lang = 'en') {
  if (!client) return getLocalData(lang).work;
  try {
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
    return data.allExperiences || getLocalData(lang).work;
  } catch (e) {
    return getLocalData(lang).work;
  }
}

export async function getEducations(lang = 'en') {
  if (!client) return getLocalData(lang).education;
  try {
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
    return data.allEducations || getLocalData(lang).education;
  } catch (e) {
    return getLocalData(lang).education;
  }
}

export async function getProjects(lang = 'en') {
  if (!client) return getLocalData(lang).projects;
  try {
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
    return data.allProjects || getLocalData(lang).projects;
  } catch (e) {
    return getLocalData(lang).projects;
  }
}

export async function getSkills(lang = 'en') {
  if (!client) return getLocalData(lang).skills;
  try {
    const query = `query MyQuery {
      allSkills(locale: ${lang}, orderBy: position_ASC) {
        name
        icon
        keyword
        level
      }
    }`;
    const data = await client.request(query);
    return data.allSkills || getLocalData(lang).skills;
  } catch (e) {
    return getLocalData(lang).skills;
  }
}

