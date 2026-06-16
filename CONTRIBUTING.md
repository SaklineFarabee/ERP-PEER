# Contributing to ERP-PEER

We'd love your help improving ERP-PEER! Here are some guidelines for contributing.

## How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

## Areas for Contribution

### Frontend
- UI/UX improvements
- New pages or features
- Performance optimization
- Mobile responsiveness
- Dark mode

### Backend
- API enhancements
- Database optimizations
- Error handling
- Authentication
- Caching

### Documentation
- Better guides
- Code examples
- Troubleshooting
- Video tutorials

### AI Features
- Better prompts
- More business insights
- Predictive analytics
- Natural language processing

## Development Setup

```bash
# Clone and setup
git clone https://github.com/SaklineFarabee/ERP-PEER.git
cd ERP-PEER
npm run install:all

# Setup environment
cp server/.env.example server/.env
# Add your Gemini API key

# Start development
npm run dev
```

## Code Style

- Use 2-space indentation
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Testing

Before submitting:
1. Test all new features
2. Check for console errors
3. Test on multiple browsers
4. Verify API endpoints work

## Reporting Issues

1. Check if the issue already exists
2. Include:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment info (OS, Node version, etc.)

## Feature Requests

We'd love to hear your ideas! Please:
1. Describe the feature
2. Explain why it would be useful
3. Provide examples or mockups

## Questions?

Feel free to open an issue with the `question` label.

Thank you for contributing! 🙌
