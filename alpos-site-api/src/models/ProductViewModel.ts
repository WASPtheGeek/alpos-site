import { Prisma } from "../../prisma/generated/client";

export interface ProductViewModel {
  id: string;
  isActive: boolean;
  isAvailable: boolean;
  /**
   * @zod.string.min(3)
   */
  name: string | null;
  description: string | null;
  manufacturer: string | null;
  country: string | null;
  price: Prisma.Decimal;
  priceExcludingVAT: Prisma.Decimal;
  imagePath: string;
  filePath: string;
  createdAt: Date;
  updatedAt: Date;
}
