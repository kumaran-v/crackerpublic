
import { OrderData, PageVisitData } from './types';

// Using the provided Google Sheet ID
const SHEET_ID = "1LKL3AQG9zN3I05HRBvucOdliywLl-vmEBzn1s3faroE"; 
const ORDER_SHEET_NAME = "Orders";
const PAGEVIEW_SHEET_NAME = "PageVisits";

// API URL for the Google Apps Script Web App
const API_URL = `https://script.google.com/macros/s/AKfycby60xIf-YQxQ8fprQSb01v8w2YxfcrDfJYZ3wrmO-c2XBSLTF0OthRZnl4CB9pv9pKM4Q/exec`;

/**
 * Log an order to Google Sheets
 */
export const logOrder = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Validate required fields before sending
    if (!orderData.customerName || !orderData.customerPhone || !orderData.orderItems) {
      return false;
    }
    
    // Create a FormData object as per the Python example
    const formData = new FormData();
    formData.append("sheetId", SHEET_ID);
    formData.append("sheetName", ORDER_SHEET_NAME);
    formData.append("timestamp", orderData.timestamp);
    formData.append("customerName", orderData.customerName);
    // Fix the email issue by setting a default value if email is empty or undefined
    formData.append("customerEmail", orderData.customerEmail || "Not provided");
    formData.append("customerPhone", orderData.customerPhone);
    formData.append("customerAddress", orderData.customerAddress);
    formData.append("orderItems", orderData.orderItems);
    formData.append("totalAmount", orderData.totalAmount.toString());
    formData.append("orderStatus", orderData.orderStatus);
    
    // Send as form data instead of JSON
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors', // Try without no-cors first
      body: formData
    });
    
    // If cors mode fails, try with no-cors as fallback
    if (!response.ok && response.type !== 'opaque') {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Log a page visit to Google Sheets
 */
export const logPageVisit = async (pageVisitData: PageVisitData): Promise<boolean> => {
  try {
    // Create a FormData object as per the Python example
    const formData = new FormData();
    formData.append("sheetId", SHEET_ID);
    formData.append("sheetName", PAGEVIEW_SHEET_NAME);  // Explicitly set to PageVisits sheet
    formData.append("timestamp", pageVisitData.timestamp);
    formData.append("pageUrl", pageVisitData.pageUrl);
    formData.append("referrer", pageVisitData.referrer || "Direct visit");
    
    // First attempt with cors mode
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error("Failed to log page visit");
      }
    } catch (e) {
      // If cors fails, try with no-cors as fallback
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    }
    
    return true;
  } catch (error) {
    // Silent fail for analytics
    return false;
  }
};
