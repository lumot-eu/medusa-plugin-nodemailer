import {
	NotificationService,
	ConfigModule,
	MedusaContainer,
} from "medusa-interfaces";

export default async (
	container: MedusaContainer,
	config: ConfigModule
): Promise<void> => {
	const notificationService = container.resolve<NotificationService>(
		"notificationService"
	);

	const events: string[] = Object.keys(config.templateMap);

	for (const event of events) {
		notificationService.subscribe(event, "email_sender");
	}
};
