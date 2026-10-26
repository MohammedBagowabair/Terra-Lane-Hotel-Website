/** WhatsApp click-to-chat. Change WA_NUMBER (international format, digits only) to point every button elsewhere. */
export const WA_NUMBER = '601151198497';
export const PHONE_DISPLAY = '+60 11-5119 8497';
export const TEL = 'tel:+601151198497';
export const waUrl = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const generalMsg = (hotel: string) => `Hello, I am interested in staying at ${hotel}. Could you please share the available room types, rates, and availability? Thank you.`;
export const roomMsg = (room: string, hotel: string) => `Hello, I am interested in the ${room} at ${hotel}. Could you please share the current rates and availability?`;
