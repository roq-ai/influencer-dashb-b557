const mapping: Record<string, string> = {
  companies: 'company',
  influencers: 'influencer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
