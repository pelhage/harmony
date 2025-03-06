#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
RESET='\033[0m'

# Clear the screen
clear

# Print header
echo -e "${CYAN}=======================================${RESET}"
echo -e "${YELLOW}      ALIEN DETECTION SYSTEM         ${RESET}"
echo -e "${CYAN}=======================================${RESET}"
echo ""

# Initialization sequence
echo -e "${BLUE}Initializing scanner...${RESET}"
sleep 1
echo -e "${GREEN}✓${RESET} Power systems online"
sleep 0.5
echo -e "${GREEN}✓${RESET} Calibrating sensors"
sleep 0.5
echo -e "${GREEN}✓${RESET} Establishing satellite uplink"
sleep 0.5
echo -e "${GREEN}✓${RESET} Loading detection algorithms"
sleep 0.5
echo -e "${GREEN}✓${RESET} System ready"
echo ""

# Start scanning animation
echo -e "${YELLOW}Beginning scan sequence...${RESET}"
echo ""

# Function to display a "radar" animation
function radar_animation() {
    local frames=("◜" "◠" "◝" "◞" "◡" "◟")
    for i in {1..20}; do
        frame=${frames[$((i % 6))]}
        echo -ne "\r${CYAN}Scanning sector ${i}/20 ${frame} ${RESET}"
        sleep 0.3
    done
    echo -e "\r${GREEN}Scan complete                 ${RESET}"
}

# Run the radar animation
radar_animation
echo ""

# Random chance to detect aliens
if [ $((RANDOM % 10)) -lt 3 ]; then
    # Alien detected!
    echo -e "${RED}! ALERT ! ALIEN LIFEFORM DETECTED${RESET}"
    sleep 1
    
    # ASCII art for alien
    echo -e "${GREEN}"
    echo "    .--.    "
    echo "   |o_o |   "
    echo "   |:_/ |   "
    echo "  //   \\ \\ "
    echo " (|     | ) "
    echo "/'\\_   _/\`\\"
    echo "\\___)=(___/"
    echo -e "${RESET}"
    
    echo -e "${YELLOW}Alien characteristics:${RESET}"
    echo -e "  ${CYAN}Species:${RESET} Unknown"
    echo -e "  ${CYAN}Threat level:${RESET} Moderate"
    echo -e "  ${CYAN}Distance:${RESET} $(( RANDOM % 1000 + 100 )) light years"
    echo ""
    
    # Space blaster mini-game
    echo -e "${MAGENTA}Initiating defense protocol...${RESET}"
    echo -e "${YELLOW}Press ENTER to fire space blaster!${RESET}"
    read -s
    
    echo -e "${RED}FIRING BLASTERS!${RESET}"
    sleep 0.5
    
    # Blaster animation
    for i in {1..5}; do
        echo -e "${YELLOW}  *${RESET}"
        sleep 0.1
        echo -e "${RED}    **${RESET}"
        sleep 0.1
        echo -e "${YELLOW}      ***${RESET}"
        sleep 0.1
        echo -e "${RED}        ****${RESET}"
        sleep 0.1
        echo -e "${YELLOW}          *****${RESET}"
        sleep 0.1
    done
    
    echo ""
    echo -e "${GREEN}Target neutralized! Earth is safe again.${RESET}"
else
    # No aliens detected
    echo -e "${GREEN}No alien lifeforms detected in this sector.${RESET}"
    echo -e "${BLUE}Continuing routine surveillance...${RESET}"
    
    # Show some stars
    for i in {1..50}; do
        x=$((RANDOM % 80))
        y=$((RANDOM % 10))
        # Move cursor to position x,y and print a star
        echo -ne "\033[${y};${x}H${WHITE}*${RESET}"
        sleep 0.05
    done
    
    # Reset cursor position
    echo -e "\033[11;0H"
    echo ""
    echo -e "${GREEN}Space sector secure. Standing by for further instructions.${RESET}"
fi

echo ""
echo -e "${CYAN}=======================================${RESET}"
echo -e "${YELLOW}      SCAN COMPLETE                  ${RESET}"
echo -e "${CYAN}=======================================${RESET}"

# Keep the script running to simulate a long-running process
echo ""
echo -e "${BLUE}Detector running on port 8080${RESET}"
echo -e "${YELLOW}Press Ctrl+C to exit${RESET}"

# Keep the script running
while true; do
    sleep 10
    echo -e "${CYAN}Still scanning... $(date +%H:%M:%S)${RESET}"
done 