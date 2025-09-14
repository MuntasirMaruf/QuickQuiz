import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post('send')
    async sendNotification(@Body() body: { interest: string; title: string; message: string }) {
        return this.notificationService.sendNotificationToInterest(body.interest, body.title, body.message);
    }
}