import { NotificationService, Logger, OrderService } from "medusa-interfaces";

interface EmailConfig {
	fromAddress: string;
	transport: Object;
	templateDir: string;
	templateMap: Object;
}

declare class EmailSenderService extends NotificationService {
	static identifier: string;
	static is_installed: boolean;

	protected orderService: OrderService;
	protected cartService: any;
	protected lineItemService: any;
	protected logger: Logger;
	protected config: EmailConfig;

	constructor(container: any, options: EmailConfig);

	sendNotification(
		event: string,
		data: any,
		attachmentGenerator: unknown
	): Promise<{
		to: string;
		status: string;
		data: Record<string, any>;
	}>;

	resendNotification(
		notification: unknown,
		config: unknown,
		attachmentGenerator: unknown
	): Promise<{
		to: string;
		status: string;
		data: Record<string, unknown>;
	}>;

	sendEmail(toAddress: string, templateName: string, data: any): Promise<void>;
}

export default EmailSenderService;
