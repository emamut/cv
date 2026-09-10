import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.datocms.com/';
const token = import.meta.env.DATOCMS_API_TOKEN;

const client = token
  ? new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  : null;

const defaultBasics = {
  name: "Faber Andrés Vergara Holguín",
  email: "fabervergara@gmail.com",
  label: "Front End Developer + Speaker",
  phone: "+57 3160414585",
  summary: "Desarrollador web con más de una década de experiencia especializado en tecnologías frontend modernas.",
  city: "Bogotá",
  country: "Colombia"
};

export async function getBasic(lang = 'en') {
  if (!client) return defaultBasics;
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

  try {
    const data = await client.request(query);
    return data.basic || defaultBasics;
  } catch (e) {
    console.error(`Error fetching basic from DatoCMS (${lang}):`, e);
    return defaultBasics;
  }
}

export async function getProfiles() {
  if (!client) {
    return [
      {
        network: "LinkedIn",
        icon: "linkedin",
        username: "emamut",
        url: "https://linkedin.com/in/emamut"
      },
      {
        network: "GitHub",
        icon: "github",
        username: "emamut",
        url: "https://github.com/emamut"
      },
      {
        network: "X",
        icon: "x",
        username: "e_mamut",
        url: "https://x.com/e_mamut"
      }
    ];
  }

  const query = `query MyQuery {
    allProfiles(orderBy: position_DESC) {
      network
      username
      icon
      url
    }
  }`;

  try {
    const data = await client.request(query);
    return data.allProfiles || [];
  } catch (e) {
    console.error("Error fetching profiles from DatoCMS:", e);
    return [];
  }
}

export async function getExperiences(lang = 'en') {
  if (!client) return [];
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

  try {
    const data = await client.request(query);
    return data.allExperiences || [];
  } catch (e) {
    console.error(`Error fetching experiences from DatoCMS (${lang}):`, e);
    return [];
  }
}

export async function getEducations(lang = 'en') {
  if (!client) return [];
  const query = `query MyQuery {
    allEducations(locale: ${lang}, orderBy: position_ASC) {
      institution
      area
      startDate
      endDate
      url
    }
  }`;

  try {
    const data = await client.request(query);
    return data.allEducations || [];
  } catch (e) {
    console.error(`Error fetching educations from DatoCMS (${lang}):`, e);
    return [];
  }
}

export async function getProjects(lang = 'en') {
  if (!client) return [];
  const query = `query MyQuery {
    allProjects(orderBy: position_ASC, locale: ${lang}) {
      name
      description
      isActive
      highlights
      url
    }
  }`;

  try {
    const data = await client.request(query);
    return data.allProjects || [];
  } catch (e) {
    console.error(`Error fetching projects from DatoCMS (${lang}):`, e);
    return [];
  }
}

export async function getSkills(lang = 'en') {
  if (!client) return [];
  const query = `query MyQuery {
    allSkills(locale: ${lang}, orderBy: position_ASC) {
      name
      icon
      keyword
      level
    }
  }`;

  try {
    const data = await client.request(query);
    return data.allSkills || [];
  } catch (e) {
    console.error(`Error fetching skills from DatoCMS (${lang}):`, e);
    return [];
  }
}

