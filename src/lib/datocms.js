import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.datocms.com/';

function getClient() {
  const token =
    import.meta.env?.DATOCMS_API_TOKEN ||
    process.env.DATOCMS_API_TOKEN ||
    import.meta.env?.DATOCMS_TOKEN ||
    process.env.DATOCMS_TOKEN;

  if (!token) {
    throw new Error(
      '⚠️ [DatoCMS] Falta la variable de entorno DATOCMS_API_TOKEN. Crea un archivo .env en la raíz del proyecto y define: DATOCMS_API_TOKEN=tu_token'
    );
  }

  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

async function executeQuery(query) {
  const client = getClient();
  try {
    return await client.request(query);
  } catch (error) {
    if (
      error?.response?.status === 401 ||
      error?.message?.includes('INVALID_AUTHORIZATION_HEADER')
    ) {
      throw new Error(
        '⚠️ [DatoCMS] Error 401 (INVALID_AUTHORIZATION_HEADER): El token DATOCMS_API_TOKEN en tu archivo .env no es válido o no tiene permisos. Verifica tu API Token en el panel de DatoCMS (Settings > API tokens).'
      );
    }
    throw error;
  }
}

export async function getBasic(lang = 'en') {
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

  const data = await executeQuery(query);
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

  const data = await executeQuery(query);
  return data.allProfiles;
}

export async function getExperiences(lang = 'en') {
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

  const data = await executeQuery(query);
  return data.allExperiences;
}

export async function getEducations(lang = 'en') {
  const query = `query MyQuery {
    allEducations(locale: ${lang}, orderBy: startDate_DESC) {
      institution
      area
      startDate
      endDate
      url
    }
  }`;

  const data = await executeQuery(query);
  return data.allEducations;
}

export async function getProjects(lang = 'en') {
  const query = `query MyQuery {
    allProjects(orderBy: position_ASC, locale: ${lang}) {
      name
      description
      isActive
      highlights
      url
    }
  }`;

  const data = await executeQuery(query);
  return data.allProjects;
}

export async function getSkills(lang = 'en') {
  const query = `query MyQuery {
    allSkills(locale: ${lang}, orderBy: position_ASC) {
      name
      icon
      keyword
      level
    }
  }`;

  const data = await executeQuery(query);
  return data.allSkills;
}

