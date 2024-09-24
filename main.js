-- Enable HttpService
local HttpService = game:GetService("HttpService")

-- Your Node.js API base URL
local apiBaseUrl = "http://localhost:3000/api"

-- Function to send a request to the /join API endpoint
local function joinServer(username)
    local endpoint = apiBaseUrl .. "/join/" .. username
    local success, result = pcall(function()
        -- Send POST request to the API
        return HttpService:PostAsync(endpoint, "", Enum.HttpContentType.ApplicationJson)
    end)

    if success then
        print(username .. " has successfully joined the server")
    else
        warn("Error joining server: " .. result)
    end
end

-- Function to send a request to the /quit API endpoint
local function quitServer(username)
    local endpoint = apiBaseUrl .. "/quit/" .. username
    local success, result = pcall(function()
        -- Send POST request to the API
        return HttpService:PostAsync(endpoint, "", Enum.HttpContentType.ApplicationJson)
    end)

    if success then
        print(username .. " has successfully quit the server")
    else
        warn("Error quitting server: " .. result)
    end
end

-- When a player joins the game, call the joinServer function
game.Players.PlayerAdded:Connect(function(player)
    joinServer(player.Name)
end)

-- When a player leaves the game, call the quitServer function
game.Players.PlayerRemoving:Connect(function(player)
    quitServer(player.Name)
end)
