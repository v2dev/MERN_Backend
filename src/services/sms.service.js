// import axios from 'axios';

export const sendSMS = {
    consoleLog: async (phone, message) => {
        console.log(`SMS sent to ${phone}: ${message}`);
    }
	// send: async (phone, message) => {
	// 	await axios.post(
	// 		'https://www.fast2sms.com/dev/bulkV2',
	// 		{
	// 			route: 'q',
	// 			message,
	// 			numbers: phone,
	// 		},
	// 		{
	// 			headers: {
	// 				authorization: process.env.FAST2SMS_API_KEY,
	// 			},
	// 		},
	// 	);
	// },
};
