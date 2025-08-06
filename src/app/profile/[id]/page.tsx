export default async function ProfileDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const param = await params;
    const id = Number(param.id);

    return <div>Player {id}</div>;
}
