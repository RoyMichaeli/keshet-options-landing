#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_DIR="/Users/shavi/Desktop/keshet.finance/keshet-landing"
DEFAULT_PORT=3000

echo -e "${GREEN}🚀 Starting Keshet.finance Landing Page${NC}"
echo "----------------------------------------"

# Change to project directory
cd "$PROJECT_DIR" || {
    echo -e "${RED}❌ Project directory not found${NC}"
    exit 1
}

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    pnpm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found, creating from example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${YELLOW}📝 Please update .env.local with your Google Sheets webhook URL${NC}"
    else
        echo "GOOGLE_SHEET_WEBHOOK_URL=" > .env.local
        echo -e "${YELLOW}📝 Created empty .env.local - please add your webhook URL${NC}"
    fi
else
    echo -e "${GREEN}✅ .env.local exists${NC}"
fi

# Check if hero images exist
if [ ! -f "public/images/hero-desktop.png" ] || [ ! -f "public/images/hero-mobile.png" ]; then
    echo -e "${YELLOW}⚠️  Hero images missing in public/images/${NC}"
    echo -e "${YELLOW}   Required: hero-desktop.png, hero-mobile.png${NC}"
fi

# Function to check if port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to get process using port
get_port_process() {
    lsof -i :$1 -t 2>/dev/null
}

# Check port availability
PORT=$DEFAULT_PORT
if check_port $PORT; then
    PID=$(get_port_process $PORT)
    PROCESS_NAME=$(ps -p $PID -o comm= 2>/dev/null)

    echo -e "${YELLOW}⚠️  Port $PORT is in use by $PROCESS_NAME (PID: $PID)${NC}"
    echo -n "Kill process and use port $PORT? (y/n/s to skip and use next available): "
    read -r response

    case $response in
        y|Y)
            echo -e "${YELLOW}Killing process $PID...${NC}"
            kill -9 $PID 2>/dev/null
            sleep 1
            echo -e "${GREEN}✅ Port $PORT freed${NC}"
            ;;
        s|S)
            # Find next available port
            for p in $(seq 3001 3010); do
                if ! check_port $p; then
                    PORT=$p
                    echo -e "${GREEN}✅ Using port $PORT${NC}"
                    break
                fi
            done
            ;;
        *)
            echo -e "${RED}❌ Cannot start without available port${NC}"
            exit 1
            ;;
    esac
else
    echo -e "${GREEN}✅ Port $PORT is available${NC}"
fi

echo "----------------------------------------"
echo -e "${GREEN}🌐 Starting development server on port $PORT...${NC}"
echo -e "${GREEN}   URL: http://localhost:$PORT${NC}"
echo "----------------------------------------"

# Start the dev server
pnpm dev -p $PORT
