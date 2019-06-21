import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ISlashCommand, SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands';

export class RemindCommand implements ISlashCommand {
    public command: string;
    public i18nDescription: string;
    public i18nParamsExample: string;
    public providesPreview: boolean;

    constructor() {
        this.command = 'remind';
        this.i18nDescription = 'command_remind_description';
        this.i18nParamsExample = 'command_remind_params';
        this.providesPreview = false;
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<void> {
        const message = modify.getNotifier().getMessageBuilder()
            .setRoom(context.getRoom())
            .setEmojiAvatar(':ghost:')
            .setUsernameAlias('RemindBot')
            .setText('Test!')
            .getMessage();

        await modify.getNotifier().notifyUser(context.getSender(), message);
    }
}
