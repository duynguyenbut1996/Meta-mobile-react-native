import algoliasearch from 'algoliasearch';
import get from 'lodash/get';

import { APP_ALGOLIA_ID, APP_ALGOLIA_KEY } from 'react-native-dotenv';


const client = algoliasearch(APP_ALGOLIA_ID, APP_ALGOLIA_KEY);
const AGOLIA_INDEX = {
  dota2Team: 'META_API_meta_dota2_teams_DEVELOPMENT',
  dota2Player: 'META_API_meta_dota2_player_profiles_DEVELOPMENT',
  mlbbTeam: 'META_API_meta_mobile_legends_team_profiles_DEVELOPMENT',
  mlbbPlayer: 'META_API_meta_mobile_legends_player_profiles_DEVELOPMENT',
};

const filterPaths = {
  mlbbTeam: {
    language: 'language',
    country: 'country.value',
    team_rank: 'metaRank.value',
    is_recruiting: 'recruiting',
    is_scrim_ready: 'readyToScrim',
  },
  mlbbPlayer: {
    kda: 'kda',
    rank: 'rank',
    user__preferred_languages: 'language',
    preferred_roles: 'role',
    user__country: 'country.value',
  },
  dota2Player: {
    preferred_server: 'server',
    rank_tier: 'rankTier',
    player_type: 'playerType',
    preferred_positions: 'position',
    user__country: 'location',
    user__preferred_languages: 'language',
  },
  dota2Team: {
    server: 'server',
    language: 'language',
    country: 'country',
    team_rank: 'metaRank',
    is_recruiting: 'recruiting',
    is_scrim_ready: 'readyToScrim',
  },
};

function callSearhAPI(filterPath, params, agoliaIndex) {
  const filters = [];
  
  Object.keys(filterPath).forEach((key) => {
    const value = get(params, filterPath[key]);
    if (!value) return;
    let format = `"${value}"`;
    if (typeof value === 'boolean' || !isNaN(+value)) {
      format = value;
    }
    filters.push(`${key}:${format}`);
  });
  
  const searchParams = { query: params.query };
  searchParams.page = params.page || 0;
  if (filters.length > 0) searchParams.filters = filters.join(' AND ');
  return agoliaIndex.search(searchParams);
}

class Agolia {
  // eslint-disable-next-line class-methods-use-this
  searchPlayer(params, type) {
    const index = client.initIndex(AGOLIA_INDEX[type]);
    params.query = `${params.metaUserName || ''} ${params.school || ''}`.trim();
    const filterPath = filterPaths[type];
    return callSearhAPI(filterPath, params, index);
  }
  
  // eslint-disable-next-line class-methods-use-this
  searchTeam(params, type) {
    const index = client.initIndex(AGOLIA_INDEX[type]);
    params.query = params.teamName.trim();
    const filterPath = filterPaths[type];
    return callSearhAPI(filterPath, params, index);
  }
}

export default new Agolia();
