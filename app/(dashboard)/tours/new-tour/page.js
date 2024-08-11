import NewTour from "@/components/NewTour";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function NewTourPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour/>
    </HydrationBoundary>
  );
}
