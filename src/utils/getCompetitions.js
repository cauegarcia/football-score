export const getCompetitions = (matches) => {
  const competitionsId = [];
  const result = matches
    .filter((match) => {
      if (!competitionsId.includes(match.competition.id)) {
        competitionsId.push(match.competition.id);
        return true;
      } else {
        return false;
      }
    })
    .map((match) => {
      return {
        id: match.competition.id,
        name: match.competition.name,
        country: match.competition.area.name,
        code: match.competition.area.code,
      };
    });
  return result;
};
