import { getMatches, getSeasonWinnerLoser } from "../../lib/prismaFunctions";
import MatchesPage from "../../components/MatchesPage";

export default async function Matches() {
    const allMatches = await getMatches(); // should include season field
    const seasonData = await getSeasonWinnerLoser();
    return <MatchesPage allMatches={allMatches} seasonData={seasonData} />;
}
