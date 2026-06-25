export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">
          Access Denied
        </h1>

        <p className="mt-2">
          You do not have permission to view
          this page.
        </p>
      </div>
    </div>
  );
}