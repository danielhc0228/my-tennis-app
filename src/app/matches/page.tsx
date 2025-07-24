import { getMatches } from "../../../lib/prismaFunctions";
import MatchesPage from "../../components/MatchesPage";

export default async function Matches() {
    const allMatches = await getMatches(); // should include season field
    return <MatchesPage allMatches={allMatches} />;
}
