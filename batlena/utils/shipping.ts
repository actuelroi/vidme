type ShippingType = "express" | "standard" | "economy" | "global";

const SHIPPING_RANGES: Record<ShippingType, [number, number]> = {
  express: [1, 3],
  standard: [3, 7],
  economy: [7, 14],
  global: [10, 21],
};

export function calculateDeliveryRange(type: ShippingType) {
  const today = new Date();
  const [minDays, maxDays] = SHIPPING_RANGES[type];

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
  });

  return `${formatter.format(minDate)} – ${formatter.format(maxDate)}`;
}
