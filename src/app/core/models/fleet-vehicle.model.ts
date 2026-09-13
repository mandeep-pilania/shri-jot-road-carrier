export interface FleetVehicle {
  id?: string;
  name: string;
  image: string;
  description: string;
  capacity: string;
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

/** Shape used when creating/editing a vehicle in the admin form, before an id exists. */
export type FleetVehicleInput = Omit<FleetVehicle, 'id' | 'createdAt' | 'updatedAt'>;
