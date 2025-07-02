import { Skeleton } from '@/components/ui/skeleton'

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-9 w-36" />
      </div>
      
      <div className="rounded-lg border">
        <div className="p-4">
          <Skeleton className="h-9 w-full" />
        </div>
        
        <div className="border-t">
          <div className="p-6">
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="grid grid-cols-6 gap-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
