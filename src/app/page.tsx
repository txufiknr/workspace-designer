import { WorkspaceProvider } from '@/context/workspace-context';
import ProductPalette from '@/components/ProductPalette';
import WorkspacePreview from '@/components/WorkspacePreview';
import SummaryBar from '@/components/SummaryBar';

export default function Home() {
  return (
    <WorkspaceProvider>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row lg:gap-6 p-4 lg:p-6">
        <ProductPalette />
        <WorkspacePreview />
        <SummaryBar />
      </main>
    </WorkspaceProvider>
  );
}
