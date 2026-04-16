import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { prisma } from "../lib/prisma";
import { ArticleDialog } from "./AritcleDialog";
import { auth } from "@clerk/nextjs/server";

export async function AppSidebar() {
  const { userId } = await auth();

  const articles = await prisma.article.findMany({
    where: { userId: userId! },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Sidebar>
      <SidebarHeader className="font-bold text-lg pl-4 pt-22">
        History
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {articles.map((article) => (
              <SidebarMenuItem key={article.id}>
                <ArticleDialog
                  title={article.title}
                  summary={article.summary}
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
