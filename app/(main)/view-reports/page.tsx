import prisma from '@/prisma/db';
import ViewReportsPage from '@/src/view/components/view-reports-page';

export const dynamic = 'force-dynamic'

async function getData() {
    const res = await prisma.report.findMany();
    return res;
}
export default async function ViewReport() {
    return <ViewReportsPage reports={await getData()} />;
}
