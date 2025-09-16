import { Injectable, Logger } from '@nestjs/common';
import * as PushNotifications from '@pusher/push-notifications-server';

@Injectable()
export class NotificationService {
    private beamsClient: any;
    private readonly logger = new Logger(NotificationService.name);

    constructor() {
        const instanceId = process.env.PUSHER_BEAMS_INSTANCE_ID;
        const secretKey = process.env.PUSHER_BEAMS_SECRET_KEY;

        if (!instanceId || !secretKey) {
            throw new Error(
                'PUSHER_BEAMS_INSTANCE_ID or PUSHER_BEAMS_SECRET_KEY is not defined in .env',
            );
        }

        // Initialize Pusher Beams client
        this.beamsClient = new PushNotifications({
            instanceId,
            secretKey,
        });

        this.logger.log('Pusher Beams client initialized successfully');
    }

    // Send a notification to a specific interest
    async sendNotificationToInterest(
        interest: string,
        title: string,
        body: string,
    ) {
        try {
            const response = await this.beamsClient.publishToInterests([interest], {
                web: {
                    notification: { title, body },
                },
            });
            this.logger.log(`Notification sent: ${JSON.stringify(response)}`);
            return response;
        } catch (error) {
            this.logger.error('Failed to send notification', error);
            throw error;
        }
    }
}
