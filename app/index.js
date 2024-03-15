import { Redirect } from "expo-router";
import { Link } from 'expo-router';


export default function Index() {
    // return <Redirect href="/(tabs)" />;
    return <Link href="/(tabs)">Navigate to nested route</Link>;

}
