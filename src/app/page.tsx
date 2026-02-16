import Card from "@/components/Card/Card";
import Icon from "@/components/Icon/Icon";
import { paths } from "@/config/routes";
import { CalendarDays, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Fisioplan</h1>
      <section>
        <Link href={paths.schedule}>
          <Card>
            <Icon>
              <CalendarDays />
            </Icon>
          </Card>
        </Link>
        <Link href={paths.quote}>
          <Card>
            <Icon>
              <Plus />
            </Icon>
          </Card>
        </Link>
      </section>
    </main>
  );
}
