// UI控制器
const UIController = {
    elements: {
        deepThinkingBtn: document.getElementById('deepThinking'),
        webSearchBtn: document.getElementById('webSearch'),
        messageInput: document.getElementById('messageInput'),
        sendButton: document.getElementById('sendButton'),
        messageArea: document.querySelector('.message-area')
    },

    templates: {
        userMessage: document.getElementById('user-message-template'),
        botMessage: document.getElementById('bot-message-template')
    },

    // 更新发送按钮状态
    updateSendButtonState() {
        const { sendButton, messageInput } = this.elements;
        const hasText = messageInput.value.trim().length > 0;
        
        sendButton.classList.remove('active', 'loading', 'empty');
        
        if (MessageHandler.isLoading) {
            sendButton.classList.add('loading');
        } else if (MessageHandler.isOutputting) {
            // 只在正在输出时禁用按钮
            sendButton.classList.add('empty');
        } else if (hasText) {
            sendButton.classList.add('active');
        } else {
            sendButton.classList.add('empty');
        }
    },

    // 添加消息
    addMessage(template, text = '') {
        const messageNode = document.importNode(template.content, true).firstElementChild;
        const messageBubble = messageNode.querySelector('.message-bubble');
        if (text) messageBubble.textContent = text;
        this.elements.messageArea.appendChild(messageNode);
        this.elements.messageArea.scrollTop = this.elements.messageArea.scrollHeight;
        return messageNode;
    }
};

// 消息处理器
const MessageHandler = {
    isLoading: false,
    activeMessageId: null,
    currentBubble: null,
    isOutputting: false,

    // 等待指定时间
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // 处理消息发送
    async handleMessage() {
        const { messageInput } = UIController.elements;
        const message = messageInput.value.trim();
        
        if (!message || this.isLoading) return; // 只检查loading状态

        // 发送用户消息
        UIController.addMessage(UIController.templates.userMessage, message);
        messageInput.value = '';
        UIController.updateSendButtonState();

        // 生成新消息的唯一ID
        const messageId = Date.now().toString();
        this.activeMessageId = messageId;

        // 发送机器人回复
        const botMessage = UIController.addMessage(UIController.templates.botMessage);
        const messageBubble = botMessage.querySelector('.message-bubble');
        this.currentBubble = messageBubble;
        const messageArea = UIController.elements.messageArea;
        
        try {
            this.isLoading = true;
            UIController.updateSendButtonState();
            
            // 添加加载动画
            messageBubble.innerHTML = '<div class="loading-spinner"></div>';
            
            // 随机延迟1-5秒
            const delay = Math.floor(Math.random() * 4000) + 1000;
            await this.wait(delay);
            
            // 如果不是当前活动消息，直接返回
            if (this.activeMessageId !== messageId) return;

            // 清除加载动画
            messageBubble.textContent = '';
            
            // 开始逐字输出
            this.isOutputting = true;
            const text = '服务器繁忙，请稍后再试。';
            for (let i = 0; i < text.length; i++) {
                if (this.activeMessageId !== messageId) {
                    // 如果被中断，保持当前输出的文字
                    return;
                }
                messageBubble.textContent += text[i];
                messageArea.scrollTop = messageArea.scrollHeight;
                await this.wait(100);
            }
        } finally {
            if (this.activeMessageId === messageId) {
                this.isLoading = false;
                this.isOutputting = false;
                this.currentBubble = null;
                UIController.updateSendButtonState();
            }
        }
    },

    // 中断当前操作
    interrupt() {
        if (this.isLoading && !this.isOutputting) {
            // 如果在加载动画阶段，清除消息
            if (this.currentBubble) {
                this.currentBubble.textContent = '';
                this.currentBubble = null;
            }
        }
        // 完全重置所有状态
        this.isLoading = false;
        this.isOutputting = false;
        this.activeMessageId = null;
        this.currentBubble = null;
        UIController.updateSendButtonState();
    }
};

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    const { deepThinkingBtn, webSearchBtn, messageInput, sendButton } = UIController.elements;

    // 功能按钮事件
    [deepThinkingBtn, webSearchBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            if (!MessageHandler.isLoading) {
                btn.classList.toggle('active');
            }
        });
    });

    // 输入框事件
    messageInput.addEventListener('input', () => {
        UIController.updateSendButtonState();
    });

    // 发送按钮事件
    sendButton.addEventListener('click', () => {
        if (MessageHandler.isLoading) {
            MessageHandler.interrupt();
        } else {
            MessageHandler.handleMessage();
        }
    });

    // 回车发送
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !MessageHandler.isLoading) {
            e.preventDefault();
            MessageHandler.handleMessage();
        }
    });
}); 