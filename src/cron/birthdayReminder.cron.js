import cron from 'node-cron';
import {Contact} from '../models/contacts.models.js';
import { sendSMS } from '../services/sms/sms.service.js';
// import { sendEmail } from '../services/email.service.js';

cron.schedule(
	'35 12 * * *', // ⏰ Every day at 9 AM
	async () => {
		console.log('🎂 Birthday reminder cron started');

		try {
			const today = new Date();
			const month = today.getMonth() + 1;
			const day = today.getDate();

			const contacts = await Contact.find({
				reminder: true,
				$expr: {
					$and: [
						{ $eq: [{ $dayOfMonth: '$dob' }, day] },
						{ $eq: [{ $month: '$dob' }, month] },
					],
				},
			});

            console.log("contacts :: => ", contacts);
            
			for (const contact of contacts) {
                const message = `Happy Birthday ${contact.name}`;
                console.log(`Sending birthday wishes to ${contact.name} (${contact.email})`);

				if (contact.phone) {
					await sendSMS(contact.mobile1, message);
				}

				// if (contact.email) {
				// 	await sendEmail(contact.email, 'Birthday Wishes', message);
				// }
			}

			console.log(`✅ ${contacts.length} birthday reminders sent`);
		} catch (err) {
			console.error('❌ Birthday cron failed:', err);
		}
	},
	{
		timezone: 'Asia/Kolkata', 
	},
);
