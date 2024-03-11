import { Redirect } from "expo-router";

export default function Index() {
    return <Redirect href="/login/Login" />;
}

/* import { Link } from 'expo-router';

export default function Root() {
  return <Link href="/home/messages">Navigate to nested route</Link>;
} */