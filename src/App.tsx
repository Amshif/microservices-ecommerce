import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { router } from "./routes";



const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        <RouterProvider router={router}/>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
