// components/GroupTripsGrid.tsx
import TripCard from "./TripCard";

export default function GroupTripsGrid({ trips }: { trips: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
